import { useEffect, useState } from "react";
import useLoader from "./useLoader";
import { useAuthContext } from "@/contexts/AuthContext";
import api from "@/utils/axios";
import {
  Branch,
  Organization,
  Repository,
  RepositoryConfigs,
} from "@/interfaces/repositoriesInterface";
import toast from "react-hot-toast";

interface RepositoryResponse {
  branches: Branch[];
  repository: Repository;
}

const useGithub = () => {
  const [organizations, setOrganizations] = useState([] as Organization[]);
  const [selectedOrganization, setSelectedOrganization] = useState(
    {} as Organization
  );
  const [repositories, setRepositories] = useState([] as Repository[]);
  const [selectedRepository, setSelectedRepository] = useState(
    {} as Repository
  );
  const [branches, setBranches] = useState([] as Branch[]);
  const [selectedBranch, setSelectedBranch] = useState({} as Branch);

  const [repositoryConfigs, setRepositoryConfigs] = useState(
    {} as RepositoryConfigs
  );

  const [source, setSource] = useState("");

  const { startLoading, stopLoading } = useLoader();
  const { userInfo } = useAuthContext();

  useEffect(() => {
    if (Object.keys(userInfo).length) {
      getOrganizations();
    }
  }, [userInfo]);

  useEffect(() => {
    getRepositories();
  }, [selectedOrganization]);

  useEffect(() => {
    if (selectedRepository.id)
      getSingleRepoConfigs({ id: selectedRepository.id });
  }, [source]);

  const getOrganizations = async () => {
    try {
      startLoading();
      const { data: organizationsResponse }: { data: Organization[] } =
        await api.get("/api/organizations");

      const personalOrganization = {
        id: 0,
        login: userInfo.name,
      };

      setOrganizations([personalOrganization, ...organizationsResponse]);

      setSelectedOrganization(personalOrganization);

      stopLoading();
    } catch (error) {
      console.error(error);
    }
  };

  const getRepositories = async () => {
    try {
      // Im not a fan of this if, dont know why
      if (selectedOrganization.id === 0) {
        const { data: repositoriesResponse } = await api.get(
          "/api/repositories"
        );

        setRepositories(repositoriesResponse);

        return;
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to fetch repositories");
    }
  };

  // Where and why i need the single repo data?
  // To select the branch!!
  // Use the same searcheable thing will be nice to look for branches
  const getSingleRepoData = async ({ id }: { id: number }) => {
    try {
      startLoading();
      // Can this be a function that also acceps parameters?
      const { data: repository }: { data: RepositoryResponse } = await api.get(
        `/api/repositories/${id}`
      );

      stopLoading();
      return repository;
    } catch (error) {
      toast.error("Unable to fetch repository");
      console.error(error);
    }
  };

  const getSingleRepoConfigs = async ({ id }: { id: number }) => {
    try {
      startLoading();
      const params = {
        repositoryRoot: source,
      };

      const { data: repositoryConfigs }: { data: RepositoryConfigs } =
        await api.get(
          `/api/repositories/${id}/configs?` + new URLSearchParams(params)
        );

      stopLoading();

      return repositoryConfigs;
    } catch (error) {
      stopLoading();
    }
  };

  // Can this handle changes be abstracted into a single function?
  const handleRepositoryChange = async (targetId: number) => {
    const repositoryToSelect = await getSingleRepoData({ id: targetId });
    const repositoryToSetConfigs = await getSingleRepoConfigs({ id: targetId });

    console.log(repositoryToSetConfigs);

    if (repositoryToSelect) {
      setSelectedRepository(repositoryToSelect.repository);
      setBranches(repositoryToSelect.branches);
    }

    if (repositoryToSetConfigs) setRepositoryConfigs(repositoryToSetConfigs);
  };

  const handleOrganizationChange = (targetId: number) => {
    const organizationToSelect = organizations.find(
      (organization) => organization.id === targetId
    );

    if (organizationToSelect) setSelectedOrganization(organizationToSelect);
  };

  const handleBranchChange = (name: string) => {
    const branchToSelect = branches.find((branch) => branch.name === name);

    if (branchToSelect) setSelectedBranch(branchToSelect);
  };

  return {
    organizations,
    selectedOrganization,
    getOrganizations,
    repositories,
    selectedRepository,
    repositoryConfigs,
    branches,
    selectedBranch,
    source,
    setSource,
    getRepositories,
    getSingleRepoData,
    handleOrganizationChange,
    handleRepositoryChange,
    handleBranchChange,
  };
};

export default useGithub;
