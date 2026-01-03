import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouteContext } from "@tanstack/react-router";
import { Loader, LoaderIcon, Trash } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Checkbox } from "@/shared/components/ui/checkbox";
import fetcher from "@/shared/lib/fetcher";
import { daysStatus } from "@/shared/lib/utils";
import subtaskService from "@/shared/services/subtask-service";
import type ApiResponse from "@/shared/types/api-response";
import type { Subtask } from "@/shared/types/subtask";
import { useAppStore } from "@/shared/store/use-app-store";
import SubtaskSelectedAction from "./subtask-selection-action";

export default function SubtasksList({ taskId }: { taskId: string }) {
  const { data, isLoading } = useQuery<ApiResponse<Subtask[]>>({
    queryKey: [`subtasks-${taskId}`],
    queryFn: () => subtaskService.getSubtasks({ taskId, isFinished: false }),
  });
  const subtasks = data?.data || [];

  const { listState, setSelectedSubtaskIds } = useAppStore(
    (state) => state.subtasks,
  );

  const queryClient = useRouteContext({
    from: "/_authenticated",
    select: (ctx) => ctx.queryClient,
  });

  const mutation = useMutation({
    mutationFn: (taskId: string) => {
      return fetcher(`/subtasks/${taskId}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`subtasks-${taskId}`] });
    },
  });

  function subtaskSelected(id: string, selected: boolean) {
    let updatedSelectedIds = listState.selectedSubtaskIds || [];
    if (selected) {
      updatedSelectedIds = [...updatedSelectedIds, id];
    } else {
      updatedSelectedIds = updatedSelectedIds.filter((taskId) => taskId !== id);
    }
    setSelectedSubtaskIds(updatedSelectedIds);
  }
  return (
    <div
      className="h-full bg-[linear-gradient(var(--color-slate-50)_2px,transparent_2px)]
 0.05em, transparent 0.05em] bg-size-[100%_32px] bg-repeat-y mt-4"
    >
      <div className="mb-3">
        {listState.selectedSubtaskIds &&
          listState.selectedSubtaskIds.length > 0 && (
            <SubtaskSelectedAction taskId={taskId} />
          )}
      </div>
      {isLoading && (
        <div className="text-center text-sm text-slate-500 h-8 flex items-center justify-center">
          <LoaderIcon className="animate-spin size-4 mr-2" />
          Loading subtasks...
        </div>
      )}
      {!isLoading &&
        subtasks?.map((subtask) => (
          <div key={subtask.id} className="h-8 flex items-center gap-3 group">
            <Checkbox
              checked={listState.selectedSubtaskIds?.includes(subtask.id)}
              onCheckedChange={(v) => subtaskSelected(subtask.id, v === true)}
              id={`subtask-${subtask.id}`}
            />
            <div className="flex gap-2 items-center">
              {subtask.priority === "high" && (
                <div className="size-3 bg-orange-600 rounded-full"></div>
              )}
              {subtask.priority === "medium" && (
                <div className="size-3 bg-amber-400 rounded-full"></div>
              )}
              {subtask.priority === "low" && (
                <div className="size-3 bg-green-400 rounded-full"></div>
              )}
              <label
                htmlFor={`subtask-${subtask.id}`}
                className="line-clamp-1 cursor-pointer"
              >
                {subtask.title}
              </label>
            </div>
            <span className="text-sm text-muted-foreground ml-auto block">
              {subtask.dueDate ? daysStatus(new Date(subtask.dueDate)) : null}
            </span>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant={"outline-destructive"}
                size={"icon"}
                className="p-0 size-8"
                onClick={() => mutation.mutate(subtask.id)}
              >
                {mutation.isPending ? (
                  <Loader className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash className="h-4 w-4 text-red-500 hover:text-red-700 cursor-pointer" />
                )}
              </Button>
            </div>
          </div>
        ))}
      {!isLoading && subtasks.length === 0 && (
        <div className="text-center text-sm text-slate-500 h-8 flex items-center justify-center">
          No tasks available. Add a new task above.
        </div>
      )}
    </div>
  );
}
