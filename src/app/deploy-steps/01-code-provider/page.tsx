"use client";

import DeployStepsLayout from "@/components/04-layouts/DeployStepsLayout";
import { useAuthContext } from "@/contexts/AuthContext";
import useLoader from "@/hooks/useLoader";
import api from "@/utils/axios";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface Organization {
  id: number;
  login: string;
}

interface Repository {
  id: number;
  name: string;
}

const CodeProviderPage = () => {
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

  const handleOrganizationChange = (targetId: number) => {
    const organizationToSelect = organizations.find(
      (organization) => organization.id === targetId
    );

    if (organizationToSelect) setSelectedOrganization(organizationToSelect);
  };

  const handleRepositoryChange = (targetId: number) => {
    console.log(targetId);

    const repositoryToSelect = repositories.find(
      (repository) => repository.id === targetId
    );

    if (repositoryToSelect) setSelectedRepository(repositoryToSelect);
  };

  useEffect(() => {
    if (Object.keys(userInfo).length) {
      getOrganizations();
    }
  }, [userInfo]);

  useEffect(() => {
    getRepositories();
  }, [selectedOrganization]);

  return (
    <DeployStepsLayout currentStep={1}>
      <div className="">
        <div>
          {organizations.length > 0 ? (
            <select
              className="select select-primary w-full max-w-xs"
              onChange={(e) =>
                handleOrganizationChange(parseInt(e.target.value))
              }
            >
              {organizations.map((organization) => (
                <option key={organization.id} value={organization.id}>
                  {organization.login}
                </option>
              ))}
            </select>
          ) : null}
        </div>

        <br />

        <div>
          <DynamicSearchBar
            data={repositories}
            setterCallback={(id) => handleRepositoryChange(id)}
          />
        </div>

        <div className="mt-10">
          <button className="btn btn-secondary" disabled>
            <Link href="/deploy-steps/02-deploy-settings ">
              Step 2 Deploy Settings
            </Link>
          </button>
        </div>
      </div>
    </DeployStepsLayout>
  );
};

interface Props {
  data: Repository[];
  setterCallback: (id: number) => void;
}

const DynamicSearchBar: React.FC<Props> = ({
  data: repositories,
  setterCallback,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to handle clicks outside of the element
    function handleClickOutside(event: MouseEvent) {
      if (
        elementRef.current &&
        !elementRef.current.contains(event.target as Node)
      ) {
        // Clicked outside of the element, so close it
        // Implement your close logic here
        setIsOpened(false);
      }
    }

    // Attach the event listener when the component mounts
    document.addEventListener("click", handleClickOutside);

    // Detach the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  /* 
    Some todos
    [] implement keyabord functionality (arrow up, down and enter)
  */

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isOpened, setIsOpened] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = repositories.filter((repository: Repository) =>
    repository.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelection = (repository: Repository) => {
    setterCallback(repository.id);
    setSearchTerm(repository.name);
  };

  return (
    <div ref={elementRef}>
      <input
        className="input input-bordered w-full max-w-xs"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
        onClick={() => setIsOpened(true)}
      />
      {filteredData.length > 1 && isOpened ? (
        <ul className="p-2 absolute shadow menu dropdown-content z-[1] bg-base-100 rounded-md mt-2 max-w-xs text-base">
          {filteredData.slice(0, 5).map((repository: Repository) => (
            <li
              key={repository.id}
              onClick={() => handleSelection(repository)}
              className="hover:bg-base-200 p-2 cursor-pointer"
            >
              {repository.name}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default CodeProviderPage;
