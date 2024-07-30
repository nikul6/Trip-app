export const getRoomIdD = (userid1: string, userid2: string) => {
    const sortedIds = [userid1, userid2].sort();
    const roomId = sortedIds.join('-');
    return roomId;
} 