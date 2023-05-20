import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import ContactUser from "./ContactUser.vue";

describe("ContactUser Test", () => {
  it("Contact user should be contain name", () => {
    const wrapper = mount(ContactUser, {
      props: {
        user: {
          name: "Hanasa",
          user_id: "u-d167j1zf1512023",
        },
        background: "#65aaaa",
      },
    });
    expect(wrapper.get("#name").text()).toContain("Hanasa");
  });
});
