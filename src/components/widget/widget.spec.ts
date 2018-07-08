// import { render } from "@stencil/core/testing";
import { FilesquashWidget } from "./widget";

describe("filesquash", () => {
  it("should build", () => {
    expect(new FilesquashWidget()).toBeTruthy();
  });

  // describe("rendering", () => {
  //   let element;
  //   beforeEach(async () => {
  //     element = await render({
  //       components: [FilesquashWidget],
  //       html: "<filesquash></filesquash>"
  //     });
  //   });
  // });
});
