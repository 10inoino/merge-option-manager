import { ArrowDownIcon, ArrowUpIcon, CopyIcon, DeleteIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Center,
  Input,
  Select,
  SimpleGrid,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';

export const MergeOptionView = () => {
  const toast = useToast();
  type mergeOption = 'MERGE' | 'SQUASH' | 'REBASE' | 'NONE';
  type mergeOptionSetting = {
    order: number;
    owner: string;
    repo: string;
    branch: string;
    mergeOption: mergeOption;
  };
  const [mergeOptionSettings, setMergeOptionSettings] = useState<mergeOptionSetting[]>([]);

  const addSetting = (
    owner: string = '*',
    repo: string = '*',
    branch: string = '*',
    mergeOption: mergeOption = 'NONE'
  ) => {
    const newMergeOptionSettings = mergeOptionSettings.concat({
      order: mergeOptionSettings.length + 1,
      owner: owner,
      repo: repo,
      branch: branch,
      mergeOption: mergeOption,
    });
    setMergeOptionSettings(newMergeOptionSettings);
  };

  const replaceOrder = (base: number, target: number) => {
    setMergeOptionSettings((prevMergeOptionSettings) => {
      const newMergeOptionSettings = prevMergeOptionSettings.map((mergeOptionSetting, i) => {
        if (mergeOptionSetting.order === base) {
          return { ...mergeOptionSetting, order: target };
        }
        if (mergeOptionSetting.order === target) {
          return { ...mergeOptionSetting, order: base };
        }
        return mergeOptionSetting;
      });
      console.log('newMergeOptionSettings', newMergeOptionSettings);
      return newMergeOptionSettings.sort((a, b) => a.order - b.order);
    });
  };

  const validateOwner = (owner: string) => {
    return owner.length > 0;
  };

  const validateRepo = (repo: string) => {
    return repo.length > 0;
  };

  const validateBranch = (branch: string) => {
    return branch.length > 0;
  };

  const validSettings = useMemo(() => {
    if (mergeOptionSettings.length === 0) return false;
    return mergeOptionSettings.every((mergeOptionSetting) => {
      return (
        validateOwner(mergeOptionSetting.owner) &&
        validateRepo(mergeOptionSetting.repo) &&
        validateBranch(mergeOptionSetting.branch)
      );
    });
  }, [mergeOptionSettings, validateOwner, validateRepo, validateBranch]);

  // useEffect(() => {
  //   chrome.storage.sync.get(['mergeOptionSettings'], (result) => {
  //     console.log('Settings retrieved', result);
  //     if (result.mergeOptionSettings && result.mergeOptionSettings.length > 0) {
  //       setMergeOptionSettings(result.mergeOptionSettings);
  //     } else {
  //       setMergeOptionSettings([
  //         {
  //           order: 1,
  //           owner: '*',
  //           repo: '*',
  //           branch: '*',
  //           mergeOption: 'NONE',
  //         },
  //       ]);
  //     }
  //   });
  // }, []);

  // const saveSettings = () => {
  //   chrome.storage.sync.set({ mergeOptionSettings: mergeOptionSettings }, () => {
  //     toast({
  //       title: 'Settings saved.',
  //       status: 'success',
  //       duration: 3000,
  //       isClosable: true,
  //     });
  //   });
  // };

  const updateRepo = (index: number, repo: string) => {
    setMergeOptionSettings((prevMergeOptionSettings) => {
      const newMergeOptionSettings = prevMergeOptionSettings.map((mergeOptionSetting, i) => {
        if (i === index) {
          return { ...mergeOptionSetting, repo: repo };
        }
        return mergeOptionSetting;
      });
      return newMergeOptionSettings;
    });
  };

  const updateBranch = (index: number, branch: string) => {
    setMergeOptionSettings((prevMergeOptionSettings) => {
      const newMergeOptionSettings = prevMergeOptionSettings.map((mergeOptionSetting, i) => {
        if (i === index) {
          return { ...mergeOptionSetting, branch: branch };
        }
        return mergeOptionSetting;
      });
      return newMergeOptionSettings;
    });
  };

  const updateMergeOption = (index: number, mergeOption: mergeOption) => {
    setMergeOptionSettings((prevMergeOptionSettings) => {
      const newMergeOptionSettings = prevMergeOptionSettings.map((mergeOptionSetting, i) => {
        if (i === index) {
          return { ...mergeOptionSetting, mergeOption: mergeOption };
        }
        return mergeOptionSetting;
      });
      return newMergeOptionSettings;
    });
  };

  const updateOwner = (index: number, owner: string) => {
    setMergeOptionSettings((prevMergeOptionSettings) => {
      const newMergeOptionSettings = prevMergeOptionSettings.map((mergeOptionSetting, i) => {
        if (i === index) {
          return { ...mergeOptionSetting, owner: owner };
        }
        return mergeOptionSetting;
      });
      return newMergeOptionSettings;
    });
  };

  const deleteSetting = (order: number) => {
    setMergeOptionSettings((prevMergeOptionSettings) => {
      const newMergeOptionSettings = prevMergeOptionSettings
        .filter((mergeOptionSetting) => mergeOptionSetting.order !== order)
        .map((mergeOptionSetting, i) => {
          if (mergeOptionSetting.order > order) {
            return { ...mergeOptionSetting, order: mergeOptionSetting.order - 1 };
          }
          return mergeOptionSetting;
        });
      return newMergeOptionSettings;
    });
  };

  return (
    <Stack m={3}>
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th color="white">#</Th>
              <Th color="white" px={1}>
                Owner
              </Th>
              <Th color="white" px={1}>
                Repository
              </Th>
              <Th color="white" px={1}>
                Branch
              </Th>
              <Th color="white" px={1}>
                Merge Option
              </Th>
              <Th px={1}></Th>
              <Th px={1}></Th>
              <Th px={1}></Th>
              <Th px={1}></Th>
            </Tr>
          </Thead>
          <Tbody>
            {mergeOptionSettings.map((mergeOptionSetting, i) => {
              return (
                <Tr key={mergeOptionSetting.order}>
                  <Td>{mergeOptionSetting.order}</Td>
                  <Td px={1}>
                    <Input
                      isInvalid={!validateOwner(mergeOptionSetting.owner)}
                      errorBorderColor="red.500"
                      value={mergeOptionSetting.owner}
                      onChange={(e) => updateOwner(i, e.target.value)}
                      size="sm"
                    />
                  </Td>
                  <Td px={1}>
                    <Input
                      isInvalid={!validateRepo(mergeOptionSetting.repo)}
                      errorBorderColor="red.500"
                      value={mergeOptionSetting.repo}
                      onChange={(e) => updateRepo(i, e.target.value)}
                      size="sm"
                    />
                  </Td>
                  <Td px={1}>
                    <Input
                      isInvalid={!validateBranch(mergeOptionSetting.branch)}
                      errorBorderColor="red.500"
                      value={mergeOptionSetting.branch}
                      onChange={(e) => updateBranch(i, e.target.value)}
                      size="sm"
                    />
                  </Td>
                  <Td px={1}>
                    <Select
                      value={mergeOptionSetting.mergeOption}
                      onChange={(e) => updateMergeOption(i, e.target.value as mergeOption)}
                    >
                      <option value="MERGE">MERGE</option>
                      <option value="SQUASH">SQUASH</option>
                      <option value="REBASE">REBASE</option>
                      <option value="NONE">NONE</option>
                    </Select>
                  </Td>
                  <Td px={1}>
                    {i !== 0 && (
                      <ArrowUpIcon
                        onClick={() => {
                          replaceOrder(mergeOptionSetting.order, mergeOptionSetting.order - 1);
                        }}
                      />
                    )}
                  </Td>
                  <Td px={1}>
                    {i !== mergeOptionSettings.length - 1 && (
                      <ArrowDownIcon
                        onClick={() => {
                          replaceOrder(mergeOptionSetting.order, mergeOptionSetting.order + 1);
                        }}
                      />
                    )}
                  </Td>
                  <Td px={1}>
                    {mergeOptionSettings.length > 1 && (
                      <DeleteIcon
                        onClick={() => {
                          deleteSetting(mergeOptionSetting.order);
                        }}
                      />
                    )}
                  </Td>
                  <Td px={1}>
                    <CopyIcon
                      onClick={() => {
                        addSetting(
                          mergeOptionSetting.owner,
                          mergeOptionSetting.repo,
                          mergeOptionSetting.branch,
                          mergeOptionSetting.mergeOption
                        );
                      }}
                    />
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Center>
        <SimpleGrid columns={2} spacing={5} width="100%">
          <Box>
            <Button
              width="100%"
              colorScheme="gray"
              onClick={() => {
                addSetting();
              }}
              color="black"
            >
              Add
            </Button>
          </Box>
          <Box>
            <Button
              width="100%"
              colorScheme="linkedin"
              onClick={() => {
                // saveSettings();
                console.log(mergeOptionSettings);
              }}
              isDisabled={!validSettings}
            >
              Save
            </Button>
          </Box>
        </SimpleGrid>
      </Center>
    </Stack>
  );
};
