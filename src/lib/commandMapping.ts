import DELFactory from "./commands/factories/DELFactory";
import EXPIREFactory from "./commands/factories/EXPIREFactory";
import GETFactory from "./commands/factories/GETFactory";
import KEYSFactory from "./commands/factories/KEYSFactory";
import LLENFactory from "./commands/factories/LLENFactory";
import LPOPFactory from "./commands/factories/LPOPFactory";
import LRANGEFactory from "./commands/factories/LRANGEFactory";
import RESTOREFactory from "./commands/factories/RESTOREFactory";
import RPOPFactory from "./commands/factories/RPOPFactory";
import RPUSHFactory from "./commands/factories/RPUSHFactory";
import SADDFactory from "./commands/factories/SADDFactory";
import SAVEFactory from "./commands/factories/SAVEFactory";
import SETFactory from "./commands/factories/SETFactory";
import SINTERFactory from "./commands/factories/SINTERFactory";
import SMEMBERSFactory from "./commands/factories/SMEMBERSFactory";
import SREMFactory from "./commands/factories/SREMFactory";
import TTLFactory from "./commands/factories/TTLFactory";
import CommandFactory from "./commands/commandFactory";

const commandMapping: Map<string, CommandFactory> = new Map(
  Object.entries({
    // String
    SET: new SETFactory(),

    GET: new GETFactory(),

    // List
    LLEN: new LLENFactory(),

    RPUSH: new RPUSHFactory(),

    LPOP: new LPOPFactory(),

    RPOP: new RPOPFactory(),

    LRANGE: new LRANGEFactory(),

    // Set
    SADD: new SADDFactory(),

    SREM: new SREMFactory(),

    SMEMBERS: new SMEMBERSFactory(),

    SINTER: new SINTERFactory(),

    // Data Expiration
    KEYS: new KEYSFactory(),

    DEL: new DELFactory(),

    EXPIRE: new EXPIREFactory(),

    TTL: new TTLFactory(),

    // Snapshot
    SAVE: new SAVEFactory(),

    RESTORE: new RESTOREFactory(),
  })
);

export default commandMapping;
