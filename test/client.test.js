// test/client.test.js

import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Promptly from "../src/Promptly";

describe("Promptly component", () => {
  test("renders prompts", async () => {
    const prompts = [
      { _id: 1, text: "Prompt 1" },
      { _id: 2, text: "Prompt 2" },
      { _id: 3, text: "Prompt 3" },
    ];
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue(prompts),
    });

    render(<Promptly />);

    expect(await screen.findByText("Prompt 1")).toBeInTheDocument();
    expect(await screen.findByText("Prompt 2")).toBeInTheDocument();
    expect(await screen.findByText("Prompt 3")).toBeInTheDocument();
  });

  test("creates a new prompt", async () => {
    const promptText = "New prompt";
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue({ _id: 4, text: promptText }),
    });

    render(<Promptly />);

    const input = screen.getByRole("textbox", { name: /create a new prompt/i });
    fireEvent.change(input, { target: { value: promptText } });

    const button = screen.getByRole("button", { name: /create prompt/i });
    fireEvent.click(button);

    expect(await screen.findByText(promptText)).toBeInTheDocument();
  });

  test("generates a response to a prompt", async () => {
    const prompt = { _id: 1, text: "Prompt 1" };
    const response = "This is a response to the prompt";
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue(response),
    });

    render(<Promptly />);

    const button = screen.getByRole("button", { name: /generate response/i });
    fireEvent.click(button);

    expect(await screen.findByText(response)).toBeInTheDocument();
  });
});

