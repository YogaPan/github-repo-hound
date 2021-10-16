function RepoList({ repos, loading, error }) {
  if (error) return "error";
  if (loading) return "loading";

  return (
    <div>
      {repos.map((repo) => {
        return <p key={repo.id}>{repo.full_name}</p>;
      })}
    </div>
  );
}

export default RepoList;
