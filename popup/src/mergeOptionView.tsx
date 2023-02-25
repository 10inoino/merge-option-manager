import {
  Button,
  Input,
  Select,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export const MergeOptionView = () => {
  type mergeOption = 'MERGE' | 'SQUASH' | 'REBASE';
  type mergeOptionSetting = {
    priority: number;
    owner: string;
    repo: string;
    branch: string;
    mergeOption: mergeOption;
  };
  const [mergeOptionSettings, setMergeOptionSettings] = useState<mergeOptionSetting[]>([]);

  const addEmptySetting = () => {
    const newMergeOptionSettings = mergeOptionSettings.concat({
      priority: mergeOptionSettings.length + 1,
      owner: '',
      repo: '',
      branch: '',
      mergeOption: 'MERGE',
    });
    setMergeOptionSettings(newMergeOptionSettings);
  }

  useEffect(() => {
    chrome.storage.sync.get(['mergeOptionSettings'], (result) => {
      console.log('Settings retrieved', result)
      if (result.mergeOptionSettings && result.mergeOptionSettings.length > 0) {
        setMergeOptionSettings(result.mergeOptionSettings);
      } else {
        setMergeOptionSettings([
          {
            priority: 1,
            owner: '',
            repo: '',
            branch: '',
            mergeOption: 'MERGE',
          }
        ]);
      }
    });
  }, []);

  const saveSettings = () => {
    chrome.storage.sync.set({ mergeOptionSettings: mergeOptionSettings }, () => {
      console.log('Settings saved');
    });
  };

  const updateRepo = (index: number, repo: string) => {
    const newMergeOptionSettings = mergeOptionSettings.map((mergeOptionSetting, i) => {
      if (i === index) {
        return { ...mergeOptionSetting, repo: repo };
      }
      return mergeOptionSetting;
    });
    setMergeOptionSettings(newMergeOptionSettings);
  };

  const updateBranch = (index: number, branch: string) => {
    const newMergeOptionSettings = mergeOptionSettings.map((mergeOptionSetting, i) => {
      if (i === index) {
        return { ...mergeOptionSetting, branch: branch };
      }
      return mergeOptionSetting;
    });
    setMergeOptionSettings(newMergeOptionSettings);
  };

  const updateMergeOption = (index: number, mergeOption: mergeOption) => {
    const newMergeOptionSettings = mergeOptionSettings.map((mergeOptionSetting, i) => {
      if (i === index) {
        return { ...mergeOptionSetting, mergeOption: mergeOption };
      }
      return mergeOptionSetting;
    });
    setMergeOptionSettings(newMergeOptionSettings);
  };

  const updateOwner = (index: number, owner: string) => {
    const newMergeOptionSettings = mergeOptionSettings.map((mergeOptionSetting, i) => {
      if (i === index) {
        return { ...mergeOptionSetting, owner: owner };
      }
      return mergeOptionSetting;
    });
    setMergeOptionSettings(newMergeOptionSettings);
  };

  return (
    <Stack m={3}>
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Owner</Th>
              <Th>Repository</Th>
              <Th>Branch</Th>
              <Th>Merge Option</Th>
            </Tr>
          </Thead>
          <Tbody>
            {mergeOptionSettings.map((mergeOptionSetting, i) => {
              return (
                <Tr>
                  <Td>{mergeOptionSetting.priority}</Td>
                  <Td>
                    <Input
                      value={mergeOptionSetting.owner}
                      onChange={(e) => updateOwner(i, e.target.value)}
                      size="sm"
                    />
                  </Td>
                  <Td>
                    <Input
                      value={mergeOptionSetting.repo}
                      onChange={(e) => updateRepo(i, e.target.value)}
                      size="sm"
                    />
                  </Td>
                  <Td>
                    <Input
                      value={mergeOptionSetting.branch}
                      onChange={(e) => updateBranch(i, e.target.value)}
                      size="sm"
                    />
                  </Td>
                  <Td>
                    <Select
                      value={mergeOptionSetting.mergeOption}
                      onChange={(e) => updateMergeOption(i, e.target.value as mergeOption)}
                    >
                      <option value="MERGE">MERGE</option>
                      <option value="SQUASH">SQUASH</option>
                      <option value="REBASE">REBASE</option>
                    </Select>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Button
        colorScheme="teal"
        onClick={() => {
          addEmptySetting();
        }}
      >
        Add
      </Button>
      <Button
        colorScheme="teal"
        onClick={() => {
          saveSettings();
        }}
      >
        Save
      </Button>
    </Stack>
  );
};
