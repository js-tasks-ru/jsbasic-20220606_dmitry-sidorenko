function makeFriendsList(friends) {
  let friendsList = document.createElement('UL');

  friends.forEach(friend => {
    let newFriend = document.createElement('LI');
    newFriend.textContent = friend.firstName + ' ' + friend.lastName;
    friendsList.append(newFriend);
  });

  return friendsList;
}
