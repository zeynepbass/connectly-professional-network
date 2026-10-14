import { users } from "@/data/users";

const byId = new Map(users.map((user) => [user.id, user]));
const byUsername = new Map(users.map((user) => [user.username, user]));

export function findUserById(id) {
  return byId.get(id) ?? null;
}

export function findUserByUsername(username) {
  return byUsername.get(username) ?? null;
}

export function getAllUsers() {
  return users;
}
