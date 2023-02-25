import { Input } from '@chakra-ui/react';
import { useState } from 'react';

export const MergeOptionView = () => {
  type mergeOption = 'MERGE' | 'SQUASH' | 'REBASE';
  type branchPerOption = { branch: string; mergeOption: mergeOption };
  type repo = { owner: string; repo: string; branches: [branchPerOption] };
  const defaultBranch: branchPerOption = { branch: 'default', mergeOption: 'MERGE' };
  const [repos, setRepos] = useState<repo[]>([
    { owner: 'owner', repo: 'repo', branches: [defaultBranch] },
  ]);
  const [newOwner, setNewOwner] = useState<string>("")
  const [newRepo, setNewRepo] = useState<string>("")
  const AddNewRepo = (newOwner: string, newRepoName: string) => {
    const newRepo: repo = { owner: newOwner, repo: newRepoName, branches: [defaultBranch] }
    setRepos([...repos, newRepo])
  }

  return (
    <div>
      {repos.map((repo) => {
        return (
          <div>
            <div>owner: {repo.owner}</div>
            <div>repo: {repo.repo}</div>
            <div>
              {repo.branches.map((branch) => {
                return (
                  <div>
                    {branch.branch}: {branch.mergeOption}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      <div>
        <span>
          New Owner: 
        </span>
        <Input 
          value={newOwner}
          onChange={(e) => setNewOwner(e.target.value)}
          size='sm'
        />
      </div>
      <div>
        <span>
          New Repo: 
        </span>
        <Input 
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
          size='sm'
        />
      </div>
      <button onClick={() => AddNewRepo(newOwner, newRepo)}>Add</button>
    </div>
  );
};
