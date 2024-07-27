import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import ExportProjectCommand from "@/components/ExportProjectCommand.vue";
import { exportProject } from "@/backend/exportProject";

vi.mock("@/backend/exportProject", () => ({
  exportProject: vi.fn(),
}));

vi.mock("@/stores/authToken", () => ({
  useAuthTokenStore: () => ({
    token: "mock-token",
  }),
}));

vi.mock("@/stores/project", () => ({
  useProjectStore: () => ({
    project: {
      id: "mock-project-id",
      workspace_id: "mock-workspace-id",
    },
  }),
}));

describe("ExportProjectCommand.vue", () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(ExportProjectCommand);
  });

  afterEach(() => {
    wrapper.unmount();
    vi.clearAllMocks();
  });

  it("renders correctly", () => {
    const wrapper = mount(ExportProjectCommand);
    expect(wrapper.text()).toContain("Export current project");
  });

  it("calls handleExportProject with correct parameters", async () => {
    const wrapper = mount(ExportProjectCommand);
    const input = wrapper.find("input");
    await input.setValue("Test Project");

    const button = wrapper.find("button");
    await button.trigger("click");

    expect(exportProject).toHaveBeenCalledWith({
      authToken: "mock-token",
      projectId: "mock-project-id",
      workspaceId: "mock-workspace-id",
      data: {
        name: "Test Project",
      },
    });
  });

  it("emits done event after export", async () => {
    const wrapper = mount(ExportProjectCommand);
    const input = wrapper.find("input");
    await input.setValue("Test Project");

    const button = wrapper.find("button");
    await button.trigger("click");

    expect(wrapper.emitted()).toHaveProperty("done");
  });
});
