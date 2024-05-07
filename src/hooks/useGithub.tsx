import { useEffect, useState } from "react";
import useLoader from "./useLoader";
import { useAuthContext } from "@/contexts/AuthContext";
import api from "@/utils/axios";
import { Organization, Repository } from "@/interfaces/github";

const useGithub = () => {
  const [organizations, setOrganizations] = useState([] as Organization[]);
  const [selectedOrganization, setSelectedOrganization] = useState(
    {} as Organization
  );
  const [repositories, setRepositories] = useState([] as Repository[]);
  const [selectedRepository, setSelectedRepository] = useState(
    {} as Repository
  );

  const { startLoading, stopLoading } = useLoader();
  const { userInfo } = useAuthContext();

  useEffect(() => {
    if (Object.keys(userInfo).length) {
      getOrganizations();
    }
  }, [userInfo]);

  useEffect(() => {
    getRepositories();
    getSingleRepo();
  }, [selectedOrganization]);

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

  const handleOrganizationChange = (targetId: number) => {
    const organizationToSelect = organizations.find(
      (organization) => organization.id === targetId
    );

    if (organizationToSelect) setSelectedOrganization(organizationToSelect);
  };

  const getRepositories = async () => {
    try {
      // I dont like this if, think on a way to abstract it when this calls becomes a hook

      console.log(selectedOrganization);

      if (selectedOrganization.id === 0) {
        const { data: repositoriesResponse } = await api.get(
          "/api/repositories"
        );

        console.log(repositoriesResponse);

        setRepositories(repositoriesResponse);
        setSelectedRepository(repositoriesResponse[0]);

        return;
      }

      // const { data: repositoriesResponse } = api.get(`/api/organizations/${organization.value.login}/repositories`)
    } catch (error) {}
  };

  const handleRepositoryChange = (targetId: number) => {
    console.log(targetId);

    const repositoryToSelect = repositories.find(
      (repository) => repository.id === targetId
    );

    if (repositoryToSelect) setSelectedRepository(repositoryToSelect);
  };

  // Where and why i need the single repo data?
  // To select the branch!!
  // Use the same searcheable thing will be nice to look for branches
  const getSingleRepo = async () => {
    try {
      startLoading();
      // Can this be a function that also acceps parameters?

      // /api/repositories/778875954/configs?repositoryRoot=
      const { data: repository }: { data: any } = await api.get(
        "/api/repositories/778875954"
      );

      console.log(repository);

      stopLoading();
    } catch (error) {
      console.error(error);
    }
  };

  return {
    organizations,
    selectedOrganization,
    getOrganizations,
    repositories,
    selectedRepository,
    getRepositories,
    getSingleRepo,
    handleOrganizationChange,
    handleRepositoryChange,
  };
};

export default useGithub;
