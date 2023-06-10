# light-weight-redis (Ledis)

A simple & light-weight simulation of Redis, which is part of a company assignment.

This README file is meant to explain the components of the system and how to extend it.

One of the advantages of this design is that the system can be extended with new commands with minimal/trivial modification to the source code.

## System components

Here's a class diagram of the system. The main components are shown.

![main components of the system and their relationships](./docs/class_diagram.svg)

Some components that are not defined in the diagram:

- A `Value` is either a `Set`, a `CircularQueue` (representing a **List**) or a `string`.
- A `LogEntry` contains a `forwardCommand` and possibly a `backwardCommand`.
- A `Result<T>` contains a value of type `T` or an error or a message.

More on the components and their relationships:

- A `Store` is where the key-value mappings reside. It supports basic dictionary operations (get, set, delete).
- A `Logger` is where any commands that cause a state change of the system reside, within a log entry along with a rollback command which on executed, would rollback the effect of the former. It supports pushing/popping `LogEntry` and taking/popping a checkpoint.
- A `StoreMediator` is the object that owns a `Store` and a `Logger`. It is the object where all commands are accepted into and passed the context of its `Store`. It also supports snapshots and setting expiration time on keys.
- Each command is represented by a `Command`. Each `Command` can be executed given a `Mediator` as the context. It can also generate a rollback command of itself giving the context.
- A `CommandFactory` is an object that creates a `Command` by parsing a raw string.
- A `Parser` maintains a mapping from a command name to a `CommandFactory` in order to parse any raw string.

## Data structures

- The **key-value mappings** are stored using the Javascript built-in `Map`, which supports sublinear dictionary operations.
- A **list** value at a key is internally stored as a `CircularQueue`, which supports constant-time random access, constant-time popping and amortized constant-time pushing at either head of the queue.
- A **set** value at a key is stored using the Javascript built-in `Set`, which supports sublinear dictionary operations.
- The **log** is stored as a Javascript built-in `Array` to support constant-time stack operations.

## Snapshots

Each time a command that mutates the store is executed, it should be logged into an in-memory log. Such commands should implement the `getRollbackCommand(mediator)` method and the system will automatically log the rollback command too.

Effectively, a chain of commands is logged. Each time you execute a `SAVE` command, a checkpoint is taken and the log is persisted.

## Advantages

This design's aim is to allow for adding more commands with ease.

More commands can be added by:

- Create your `Command` subclass in a file stored in `./src/lib/commands/commands_imp/`.
- Create your `CommandFactory` subclass in a file stored in `./src/lib/commands/factories/` that's capable of parsing a raw string to return your `Command` subclass. An utility function named `extractToken` stored in `./src/lib/utils/extractToken.ts` can be used to easen the tokenizing step.
- Add an entry corresponding to your command in `./src/lib/commandMapping.ts`.

## Flaws

Commands can interfere with each other in an unexpected way. For example, if a mutation command is to be added, the command should manually clear the timeout on the key(s) it's about to modify.

## Interface

### Commands

#### String

- `GET key`: Return a **string** value at `key`. If `key` does not exist or the value that resides there is not a **string**, return an error.
- `SET key value`: Set the **string** value at `key` to `value`. If the value that resides at `key` is not a **string**, return an error.

#### List

- `LLEN key`: Return the length of the **list** at `key`. If `key` does not exist or the value that resides there is not a **list**, return an error.
- `RPUSH key value1 [value2...]`: Append one or more values to the list, create list if not exists, return length of list after operation. If a value exists but is not a **list**, return an errorr.
- `LPOP key`: Remove and return the first item of the list. If `key` does not exist or the value that resides there is not a **list**, return an error.
- `RPOP key`: Remove and return the last item of the list. If `key` does not exist or the value that resides there is not a **list**, return an error.
- `LRANGE key start stop`: Return a range of element from the list (zero-based, inclusive of `start` and `stop`), `start` and `stop` are non-negative integers. If `key` does not exist or the value that resides there is not a **list**, return an error.

#### Set

- `SADD key value1 [value2...]`: Add values to set stored at key. If a **set** doesn't exist at `key`, create one first. If a **set** exists but is not a **set**, return an error.
- `SREM key value1 [value2...]`: Remove values from set. If `key` does not exist or the value that resides there is not a **set**, return an error.
- `SMEMBERS key`: Return array of all members of set. If `key` does not exist or the value that resides there is not a **set**, return an error.
- `SINTER [key1] [key2] [key3] ...`: Set intersection among all set stored in specified keys. Return array of members of the result set. If `key` does not exist or the value that resides there is not a **set**, return an error.

#### Data Expiration

- `KEYS`: List all available keys.
- `DEL key`: Delete the value stored at `key`. If `key` does not exist, return an error.
- `EXPIRE key seconds`: Set a timeout on `key`, `seconds` is a positive integer (by default a key has no expiration). Return the number of `seconds` if the timeout is set. If `key` does not exist, return an error.
- `TTL key`: Query the timeout of a `key`. If `key` does not exist, return an error.

#### Snapshot

- `SAVE`: Save current state in a snapshot. If the current state is already saved, this command has no effect.
- `RESTORE`: Restore from the last snapshot.
