const getGroupName = (groupName: string) => {
  if (groupName?.length > 14) {
    return `${groupName.slice(0, 14)}...`;
  } else return groupName;
};

export default getGroupName;
