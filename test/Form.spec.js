import MyForm from "../dist/Form";
import { removeInputWord } from "../dist/utilities";

describe("Laravel Form helper", () => {
  describe("Error Handling", () => {
    it("it knows when form input has error", () => {
      let form = new MyForm();
      form.error = {
        "input.name": "Benedict",
        message: "Input name is required",
      };

      expect(form.hasError("input.name")).toEqual(true);
    });

    it("it diplays error message", () => {
      const form = new MyForm();

      form.error = { "input.name": ["The input.name field is required."] };

      expect(form.errorOut("input.name", removeInputWord)).toEqual(
        "The name field is required."
      );
    });
  });

  describe("Clear and reset form", () => {
    it("it clear the form input", () => {
      let form = new MyForm({
        name: "Benedict",
        email: "",
      });

      expect(form.name).toEqual("Benedict");

      form.clearInput("name");

      expect(form.name).toEqual("");
    });

    it("it clear all the errors on the fields", () => {
      let form = new MyForm({
        name: "Benedict",
        email: "mwangaben@gmail.com",
      });

      form.error = {
        "input.name": ["The input.name field is required."],
        "input.email": ["The input.email field is required."],
      };

      expect(form.hasError("input.email")).toBeTruthy();
      form.clearAll();

      expect(form.hasError("input.name")).toBeFalsy();
      expect(form.hasError("input.email")).toBeFalsy();
    });
  });

  it("resets form input", () => {
    const form = new MyForm({
      name: "Benedict",
      email: "mwangabn@gmail.com",
    });

    form.reset();

    expect(form.name).toBe("");
  });

  it("removes the property", () => {
    const form = new MyForm({
      name: "hello",
      age: 30,
    });

    form.removeProperty("age");

    // console.log(form);

    expect(form.hasOwnProperty("age")).toBeFalsy();
  });

  it("removes the properties", () => {
    const form = new MyForm({
      name: "hello",
      age: 30,
      location: "DSM",
    });

    form.removeProperties(["age", "location"]);

    // console.log(form);

    expect(form.hasOwnProperty("age")).toBeFalsy();
    expect(form.hasOwnProperty("location")).toBeFalsy();
    expect(form.hasOwnProperty("name")).toBeTruthy();
  });

  it("it reset to zero", () => {
    const form = new MyForm({
      age: 23,
      amount: 2000,
    });

    form.resetToZero();

    expect(form.age).toEqual(0);
    expect(form.amount).toEqual(0);
  });
});
