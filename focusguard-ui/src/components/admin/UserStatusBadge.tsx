interface Props {
  active: boolean;
}

const UserStatusBadge = ({
  active,
}: Props) => {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        active
          ? `
            bg-green-100
            text-green-700
            dark:bg-green-950/60
            dark:text-green-300
          `
          : `
            bg-red-100
            text-red-700
            dark:bg-red-950/60
            dark:text-red-300
          `
      }`}
    >
      {active ? "Active" : "Inactive"}
    </span>
  );
};

export default UserStatusBadge;