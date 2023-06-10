"use strict";

const container = document.getElementById("cli__screen");
const input = document.getElementById("input__prompt");
const output = document.getElementById("cli__output");

container.onclick = () => {
  input.focus();
};

input.onkeydown = (event) => {
  if (event.key !== "Enter") return;

  const newPromptLine = document.createElement("div");
  newPromptLine.textContent = `LEDIS > ${input.value}`;
  newPromptLine.className = "cli__output__line--prompt";

  output.appendChild(newPromptLine);
  event.preventDefault();
  if (input.value.trim() !== "")
    fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
        "Cache-Control": "no-cache",
      },
      body: input.value,
    })
      .then((res) => res.text())
      .then((text) => {
        const newResponseLine = document.createElement("div");
        newResponseLine.textContent = `${text}\n`;
        newResponseLine.className = "cli__output__line--response";
        output.appendChild(newResponseLine);
        input.scrollIntoView();
      });
  input.scrollIntoView();
  input.value = "";
};
