import type { components } from "./api";
import { API_BASE_URL } from "./constants";
import type { Project } from "./types";

export const createProject = async ({
  authToken,
  workspaceId,
  data,
}: {
  workspaceId: string;
  authToken: string;
  data: components["schemas"]["Projects.CreateProjectRequest"];
}) => {
  const res = await fetch(
    `${API_BASE_URL}/workspaces/${workspaceId}/projects`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(data),
    }
  );

  const createProjectResponse = await res.json();

  return createProjectResponse.data as Project;
};
