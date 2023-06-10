"use strict";

const container = document.getElementById("cli-container");
const input = document.getElementById("cli-input");
const output = document.getElementById("cli-output");

container.onclick = () => {
  input.focus();
};

input.onkeydown = (event) => {
  if (event.key !== "Enter") return;

  const newPromptLine = document.createElement("div");
  newPromptLine.textContent = `LEDIS > ${input.value}`;
  newPromptLine.className = "cli-output-prompt-line";

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
        newResponseLine.className = "cli-output-response-line";
        output.appendChild(newResponseLine);
        input.scrollIntoView();
      });
  input.value = "";
};
