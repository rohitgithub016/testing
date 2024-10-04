

const getUserName = (name: string) => {
    if(name?.length > 10) {
        return `${name?.slice(0, 10)}...`
    }
    return name;
}

export default getUserName;
