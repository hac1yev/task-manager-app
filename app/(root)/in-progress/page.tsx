import FilteredTasks from "@/components/FilteredTasks/FilteredTasks";

const inProgress = () => {
  return (
    <FilteredTasks stage={"IN PROGRESS"} />
  );
};

export default inProgress;