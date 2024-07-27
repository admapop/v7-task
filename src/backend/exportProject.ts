import type { components } from "./api";
import { API_BASE_URL } from "./constants";
import type { Export } from "./types";

export const exportProject = async ({
  authToken,
  projectId,
  workspaceId,
  data,
}: {
  workspaceId: string;
  projectId: string;
  authToken: string;
  data: components["schemas"]["Exports.CreateExportRequest"];
}) => {
  const res = await fetch(
    `${API_BASE_URL}/workspaces/${workspaceId}/projects/${projectId}/exports`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(data),
    }
  );

  const exportProjectResponse = await res.json();

  return exportProjectResponse.data as Export;
};
