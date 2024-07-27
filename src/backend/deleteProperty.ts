import type { components } from "./api";
import { API_BASE_URL } from "./constants";

export const deleteProperty = async ({
  authToken,
  projectId,
  workspaceId,
  propertyIdOrSlug,
}: {
  workspaceId: string;
  projectId: string;
  authToken: string;
  propertyIdOrSlug: string;
}) => {
  const isUuid = (str: string) => {
    const uuidPattern =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return uuidPattern.test(str);
  };
  const sanitizedPropertyIdOrSlug = isUuid(propertyIdOrSlug)
    ? propertyIdOrSlug
    : propertyIdOrSlug.toLowerCase().replace(/ /g, "-");
  const res = await fetch(
    `${API_BASE_URL}/workspaces/${workspaceId}/projects/${projectId}/properties/${sanitizedPropertyIdOrSlug}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

  const deletePropertyResponse = await res.json();

  return deletePropertyResponse.data as components["schemas"]["Common.DeleteResponse"];
};
