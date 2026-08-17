import { useQuery } from "@tanstack/react-query";

import {
  getOrganizationAIRecommendation,
} from "../api/organizationAI.api";

export const useOrganizationAI = () => {
  return useQuery({
    queryKey: ["organization-ai-recommendation"],
    queryFn: getOrganizationAIRecommendation,
  });
};