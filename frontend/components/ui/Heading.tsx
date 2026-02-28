export const Heading = ({ children }: { children: React.ReactNode }) => {
  return (
    <h1 className="my-8 text-3xl font-black tracking-tight text-foreground sm:my-10 sm:text-4xl">
      {children}
    </h1>
  );
};
