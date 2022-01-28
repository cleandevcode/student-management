import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Input from "./input";
import "@testing-library/jest-dom/extend-expect";

describe("Input value", () => {
  it("updates on change", () => {
    const onChange = jest.fn((value) => {});

    const { queryByPlaceholderText } = render(<Input onChange={onChange} />);

    const input = queryByPlaceholderText("type a text...");

    fireEvent.change(input, { fieldName: "firstName", value: "Cheng" });

    expect(input.value).toBe("test");
  });
});
