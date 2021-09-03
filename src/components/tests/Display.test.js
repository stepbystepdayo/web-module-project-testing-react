import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Display from "./../Display";
import Show from "./../Show";

//we need to make a mock
import fetchShow from "../../api/fetchShow";
jest.mock("../../api/fetchShow");

const testShow = {
  name: "Sayo",
  summary: "she need to go to Japan",
  seasons: [
    { id: 0, name: "season 1", episodes: [] },
    { id: 1, name: "season 2", episodes: [] },
  ],
};

test("that the Display component renders without any passed in props", () => {
  render(<Display />);
});

test("renders show component when fetch bottun pressed", () => {
  //Arrange
  render(<Display show={testShow} />);
  render(<Show show={testShow} selectedSeason={"none"} />);
  fetchShow.mockResolvedValueOnce(testShow);
  //Act
  const button = screen.getByRole("button");
  fireEvent.click(button);

  //Assert
  const select = screen.getByLabelText("Select A Season");

  expect(select).toBeInTheDocument();
});

test("when fetch pressed, select options match amount of seasons ", () => {
  render(<Display show={testShow} />);
  render(<Show show={testShow} selectedSeason={"none"} />);
  fetchShow.mockResolvedValueOnce(testShow);
  //Act
  const button = screen.getByRole("button");
  fireEvent.click(button);

  //Assert
  const option = screen.getAllByTestId("season-option");
  expect(option.length).toBe(testShow.seasons.length);
});

test("if displayFun fires after fetch is pressed", async () => {
  fetchShow.mockResolvedValueOnce(testShow);
  const displayFunc = jest.fn();
  render(<Display show={testShow} displayFunc={displayFunc} />);

  const button = screen.getByRole("button");
  userEvent.click(button);

  //Assert
  await waitFor(() => expect(displayFunc).toHaveBeenCalled());
});

///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.
