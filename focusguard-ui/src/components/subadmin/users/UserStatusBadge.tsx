interface Props {
  active: boolean;
}

const UserStatusBadge = ({
  active,
}: Props) => {
  return active ? (
    <span className="inline-flex whitespace-nowrap rounded-full bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-700">
      Active
    </span>
  ) : (
    <span className="inline-flex whitespace-nowrap rounded-full bg-red-100 px-3 py-1.5 text-xs font-semibold text-red-700">
      Inactive
    </span>
  );
};

export default UserStatusBadge;