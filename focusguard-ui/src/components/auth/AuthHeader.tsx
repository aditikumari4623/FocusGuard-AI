interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

const AuthHeader = ({
  title,
  subtitle,
}: AuthHeaderProps) => {
  return (
    <div className="mb-10 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-slate-900">
        {title}
      </h1>

      <p className="mt-3 text-slate-500">
        {subtitle}
      </p>
    </div>
  );
};

export default AuthHeader;