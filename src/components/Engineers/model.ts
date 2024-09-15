
export type Engineer = {
    candidateName: string;
    description: string;
    topSkills: string;
    hourRate: string;
    percentage: string;
}

export type StorageData = Array<{
    candidates: Engineer[];
}>;