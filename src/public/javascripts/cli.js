"use strict";

const input = document.getElementById("cli-input");
const output = document.getElementById("cli-output");

input.onkeydown = (event) => {
  if (event.key !== "Enter") return;

  const newPromptLine = document.createElement("div");
  newPromptLine.textContent = `$ ${input.value}`;
  newPromptLine.className = "cli-output-prompt-line";
  output.appendChild(newPromptLine);
  event.preventDefault();
  fetch("/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
    },
    body: JSON.stringify({ commandString: input.value }),
  })
    .then((res) => res.text())
    .then((text) => {
      const newResponseLine = document.createElement("div");
      newResponseLine.textContent = `> ${text}\n`;
      newResponseLine.className = "cli-output-response-line";
      output.appendChild(newResponseLine);
    });
  input.value = "";
};
