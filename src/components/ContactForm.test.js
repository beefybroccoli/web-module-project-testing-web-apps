import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ContactForm from "./ContactForm";

//==========================================================
test("renders without errors", () => {
  //arrange------------------------------------------------
  render(<ContactForm />);
  //act----------------------------------------------------
  const form = screen.getByText(/contact form/i);
  //assert-------------------------------------------------
  expect(form).toBeTruthy();
  expect(form).toBeInTheDocument();
});

//==========================================================
test("renders the contact form header", () => {
  //arrange-------------------------------------------------
  render(<ContactForm />);
  //act-----------------------------------------------------
  const h1 = screen.getByText(/contact form/i);
  //assert--------------------------------------------------
  expect(h1).toBeTruthy();
  expect(h1).toBeInTheDocument();
  expect(h1).toBeVisible();
  expect(h1).toHaveTextContent("Contact Form");
});

//==========================================================
test("renders ONE error message if user enters less then 5 characters into firstname.", async () => {
  //arrange--------------------------------------------------
  render(<ContactForm />);
  //act------------------------------------------------------
  const firstNameInput = screen.getByLabelText(/first name/i);
  userEvent.type(firstNameInput, "abc");
  console.log("firstNameInput.textContent = ", firstNameInput.value);

  //assert---------------------------------------------------
  const promise = screen.findByText(/least 5 characters/i);
  promise.then((firstNameError) => {
    expect(firstNameError).toBeTruthy();
    expect(firstNameError).toHaveTextContent(
      /firstname must have at least 5 characters/i
    );
    // console.log("firstNameError.textContent = ", firstNameError.textContent);
  });
}); //end test

//==========================================================
test("renders THREE error messages if user enters no values into any fields.", async () => {
  //???????????????????????
  //   const DEBUG = true;
  const DEBUG = false;
  //????????????????????????

  //????????????????????????????????????????????????????????????
  // ???           What is wrong with the promise ??????????????
  //????????????????????????????????????????????????????????????
  //arrange--------------------------------------------------
  render(<ContactForm />);
  //act-------------------------------------------------------
  const form = screen.getByText(/contact form/i);
  //grap three inputs
  const firstNameInput = screen.getByLabelText(/first name/i);
  const lastNameInput = screen.getByLabelText(/last name/i);
  const emailInput = screen.getByLabelText(/email/i);
  //clear all three input
  DEBUG && console.log("firstNameInput.value = ", firstNameInput.value);
  DEBUG && console.log("lastNameInput.value = ", lastNameInput.value);
  DEBUG && console.log("emailInput.value = ", emailInput.value);

  //click submit
  const submitButton = screen.getByRole("button");
  userEvent.click(submitButton);

  //assert--------------------------------------------------
  const Promise1 = screen.findByText(/least 5 characters/i);
  //????????????????????????????????????????????????????????
  //? Why screen.getByText(/least 5 characters/i) fail     ?
  //   const Promise1 = screen.getByText(/least 5 characters/i);
  //????????????????????????????????????????????????????????
  Promise1.then((firstNameError) => {
    expect(firstNameError).toBeInTheDocument();
    expect(firstNameError).toBeTruthy();
    DEBUG &&
      console.log("firstNameError.textContent = ", firstNameError.textContent);
  });
  //assert--------------------------------------------------
  const Promise2 = screen.findByText(/lastname is a required field/i);
  Promise2.then((lastNameError) => {
    expect(lastNameError).toBeInTheDocument();
    expect(lastNameError).toBeTruthy();
    DEBUG &&
      console.log("lastNameError.textContent = ", lastNameError.textContent);
  });
  //assert--------------------------------------------------
  const Promise3 = screen.findByText(/valid email address/i);
  Promise3.then((emailError) => {
    expect(emailError).toBeInTheDocument();
    expect(emailError).toBeTruthy();
    DEBUG && console.log("emailError = ", emailError.textContent);
  });
});
//==========================================================
test("renders ONE error message if user enters a valid first name and last name but no email.", async () => {
  const DEBUG = false;
  //arrange-------------------------------------------------
  render(<ContactForm />);
  //act-----------------------------------------------------
  const form = screen.getByText(/contact form/i);
  //grap three inputs
  const firstNameInput = screen.getByLabelText(/first name/i);
  const lastNameInput = screen.getByLabelText(/last name/i);
  const emailInput = screen.getByLabelText(/email/i);
  //type text into three input
  userEvent.type(firstNameInput, "jasony");
  userEvent.type(lastNameInput, "hank");
  userEvent.type(emailInput, "");
  DEBUG && console.log("firstNameInput.value = ", firstNameInput.value);
  DEBUG && console.log("lastNameInput.value = ", lastNameInput.value);
  DEBUG && console.log("emailInput.value = ", emailInput.value);
  DEBUG && console.log(form);

  //click submit
  const submitButton = screen.getByRole("button");
  userEvent.click(submitButton);

  //assert----------------------------------------------------
  const Promise3 = screen.findByText(/valid email address/i);
  Promise3.then((emailError) => {
    expect(emailError).toBeInTheDocument();
    expect(emailError).toBeTruthy();
    DEBUG && console.log("emailError = ", emailError.textContent);
  });
});
//==========================================================
test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  const DEBUG = false;
  //arrange-------------------------------------------------
  render(<ContactForm />);
  //act------------------------------------------------------
  const form = screen.getByText(/contact form/i);
  //grap the email inputs
  const emailInput = screen.getByLabelText(/email/i);
  //type text into three input
  userEvent.type(emailInput, "223432432432");
  DEBUG && console.log("emailInput.value = ", emailInput.value);
  //   DEBUG && console.log(form);

  //assert----------------------------------------------------
  const Promise3 = screen.findByText(/valid email address/i);
  Promise3.then((emailError) => {
    expect(emailError).toBeInTheDocument();
    expect(emailError).toBeTruthy();
    DEBUG && console.log("emailError = ", emailError.textContent);
  });
});
//==========================================================
test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  const DEBUG = false;
  //arrange--------------------------------------------------
  render(<ContactForm />);
  //act-----------------------------------------------------
  const form = screen.getByText(/contact form/i);
  //grap three inputs
  const firstNameInput = screen.getByLabelText(/first name/i);
  const emailInput = screen.getByLabelText(/email/i);
  //type text into three input
  userEvent.type(firstNameInput, "tommya");
  userEvent.type(emailInput, "scrab@yahoo.com");
  DEBUG && console.log("firstNameInput.value = ", firstNameInput.value);
  DEBUG && console.log("emailInput.value = ", emailInput.value);

  //click submit
  const submitButton = screen.getByRole("button");
  userEvent.click(submitButton);

  //assert---------------------------------------------------

  const Promise2 = screen.findByText(/lastname is a required field/i);
  Promise2.then((lastNameError) => {
    expect(lastNameError).toBeInTheDocument();
    expect(lastNameError).toBeTruthy();
    DEBUG && console.log("lastNameError = ", lastNameError.textContent);
  });
});
//==========================================================
test("renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.", async () => {
  //???????????????????????
  //   const DEBUG = true;
  const DEBUG = false;
  //????????????????????????

  //arrange---------------------------------------------------
  render(<ContactForm />);
  //act-------------------------------------------------------
  const form = screen.getByText(/contact form/i);
  //grap three inputs
  const firstNameInput = screen.getByLabelText(/first name/i);
  const lastNameInput = screen.getByLabelText(/last name/i);
  const emailInput = screen.getByLabelText(/email/i);
  //type input into all three inputs
  userEvent.type(firstNameInput, "Tommyam");
  userEvent.type(lastNameInput, "Hanktoy");
  userEvent.type(emailInput, "tomHankd@aol.com");
  //clear all three input
  DEBUG && console.log("firstNameInput.value = ", firstNameInput.value);
  DEBUG && console.log("lastNameInput.value = ", lastNameInput.value);
  DEBUG && console.log("emailInput.value = ", emailInput.value);

  //click submit
  const submitButton = screen.getByRole("button");
  userEvent.click(submitButton);

  //assert--------------------------------------------------
  const Promise1 = screen.findByTestId(/firstnamedisplay/i);
  Promise1.then((firstnameDisplay) => {
    expect(firstnameDisplay).toBeInTheDocument();
    expect(firstnameDisplay).toBeTruthy();
    DEBUG &&
      console.log(
        "firstnameDisplay.textContent = ",
        firstnameDisplay.textContent
      );
  });
  //assert--------------------------------------------------
  const Promise2 = screen.findByTestId(/lastnamedisplay/i);
  Promise2.then((lastnameDisplay) => {
    expect(lastnameDisplay).toBeInTheDocument();
    expect(lastnameDisplay).toBeTruthy();
    DEBUG &&
      console.log(
        "lastnameDisplay.textContent = ",
        lastnameDisplay.textContent
      );
  });
  //assert--------------------------------------------------
  const Promise3 = screen.findByTestId(/emaildisplay/i);
  Promise3.then((emailDisplay) => {
    expect(emailDisplay).toBeInTheDocument();
    expect(emailDisplay).toBeTruthy();
    DEBUG && console.log("emailDisplay = ", emailDisplay.textContent);
  });
});
//==========================================================
test("renders all fields text when all fields are submitted.", async () => {
  //???????????????????????
  //   const DEBUG = true;
  const DEBUG = false;
  //????????????????????????

  //arrange-------------------------------------------------
  render(<ContactForm />);
  //act-----------------------------------------------------
  const form = screen.getByText(/contact form/i);
  //grap three inputs
  const firstNameInput = screen.getByLabelText(/first name/i);
  const lastNameInput = screen.getByLabelText(/last name/i);
  const emailInput = screen.getByLabelText(/email/i);
  //type input into all three inputs
  userEvent.type(firstNameInput, "Tommyam");
  userEvent.type(lastNameInput, "Hanktoy");
  userEvent.type(emailInput, "tomHankd@aol.com");

  //assert----------------------------------------------------
  //?????????????????????????????????????????????????????????
  //? What am I suppose to assert in this test? ?????????????
  //?????????????????????????????????????????????????????????
  DEBUG && console.log("firstNameInput.value = ", firstNameInput.value);
  DEBUG && console.log("lastNameInput.value = ", lastNameInput.value);
  DEBUG && console.log("emailInput.value = ", emailInput.value);

  //   const promise = () => {
  //     //click submit
  //     const submitButton = screen.getByRole("button");
  //     userEvent.click(submitButton);
  //     return null;
  //   };

  //   promise.then(() => {
  //     console.log("firstNameInput.value = ", firstNameInput.value);
  //     console.log("lastNameInput.value = ", lastNameInput.value);
  //     console.log("emailInput.value = ", emailInput.value);
  //   });
});
