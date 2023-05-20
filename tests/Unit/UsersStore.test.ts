import { useUsersStore } from "./../../src/stores/users";
import { createPinia, setActivePinia, storeToRefs } from "pinia";
import { assert, beforeEach, describe, expect, test } from "vitest";

describe("Users Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test("Update First User", () => {
    const usersStore = useUsersStore();
    const { users } = storeToRefs(usersStore);
    users.value = [
      {
        id: 0,
        created_at: "",
        admin_id: "",
        user_id: "ASD",
        name: "user-1",
        username: "user1",
        color_profile: "",
      },
      {
        id: 0,
        created_at: "",
        admin_id: "",
        user_id: "AAA",
        name: "user-2",
        username: "user2",
        color_profile: "",
      },
    ];
    usersStore.updateUser("ASD", "edit user-1", "e-user-1", "");
    expect(users.value[0].name).toBe("edit user-1");
  });

  test("delete user by userId", () => {
    const usersStore = useUsersStore();
    const { users } = storeToRefs(usersStore);
    users.value = [
      {
        id: 0,
        created_at: "",
        admin_id: "",
        user_id: "ASD",
        name: "user-1",
        username: "user1",
        color_profile: "",
      },
      {
        id: 0,
        created_at: "",
        admin_id: "",
        user_id: "AAA",
        name: "user-2",
        username: "user2",
        color_profile: "",
      },
      {
        id: 0,
        created_at: "",
        admin_id: "",
        user_id: "ABC",
        name: "user-3",
        username: "user2",
        color_profile: "",
      },
    ];
    usersStore.deleteUser("AAA");
    assert.equal(users.value.length, 2);
  });
});
