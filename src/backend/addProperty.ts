import type { components } from "./api";
import { API_BASE_URL } from "./constants";
import type { Property } from "./types";

export const addProperty = async ({
  authToken,
  projectId,
  workspaceId,
  data,
}: {
  workspaceId: string;
  projectId: string;
  authToken: string;
  data: components["schemas"]["Projects.AddPropertyRequest"];
}) => {
  const res = await fetch(
    `${API_BASE_URL}/workspaces/${workspaceId}/projects/${projectId}/properties`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(data),
    }
  );

  const addPropertyResponse = await res.json();
  console.log(addPropertyResponse);

  return addPropertyResponse.data as Property;
};
