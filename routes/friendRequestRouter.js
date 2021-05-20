const express = require("express");
const db = require("../db/db");
const isAuth = require("../utility");
const friendRequest = db.friend_request;
const Friend = db.friends;
const Op = db.Sequelize.Op;
const friendRequestRouter = express.Router();

friendRequestRouter.post("/sendFriendrequest", isAuth, async (req, res) => {
  console.log("Inside sendFriendRequest");
  const secondRequest = await friendRequest.findAll({
    where: {
      user_id: req.user.id,
      friend_user_id: req.body.friendUserId,
      [Op.or]: [{ status: 1 }, { status: 2 }],
      // 1 - Friend Request sent
    },
  });
  console.log(`---------`);
  console.log(secondRequest);
  // console.log(secondRequest[0].dataValues.status);
  console.log(`---------`);

  if (secondRequest.length != 0) {
    if (secondRequest[0].dataValues.status == 1) {
      console.log("You have already sent a friend req");
      res.send({ message: "You have already sent a friend req" });
      return;
    }
    console.log("You are already a friend to this person");
    res.send({ message: "You are already a friend to this person" });
    return;
  }

  const additionalRequest = await friendRequest.findAll({
    where: {
      user_id: req.body.friendUserId,
      friend_user_id: req.user.id,
      [Op.or]: [{ status: 1 }, { status: 2 }],
      // 1 - Friend Request sent
    },
  });

  console.log(`---------`);
  console.log(additionalRequest);
  // console.log(secondRequest[0].dataValues.status);
  console.log(`---------`);
  if (additionalRequest != 0) {
    if (additionalRequest[0].dataValues.status == 1) {
      console.log("You have already sent a friend req");
      res.send({ message: "You have already sent a friend req" });
      return;
    }
    console.log("You are already a friend to this person");
    res.send({ message: "You are already a friend to this person" });
    return;
  }

  const data = {
    // user_id: req.body.userId,
    user_id: req.user.id,
    friend_user_id: req.body.friendUserId,
    status: 1, // 1 - Friend Request sent
  };
  try {
    const requestSent = await friendRequest.create(data);
    console.log("Friend Request sent  successfully");
    res.status(200).send({ message: "Friend Request sent  successfully" });
    return;
  } catch (err) {
    console.log(err);
  }
  return;
});

friendRequestRouter.get("/getFriendrequest", isAuth, async (req, res) => {
  const users = await friendRequest.findAll({
    where: {
      friend_user_id: req.user.id,
      status: 1,
    },
  });
  if (users) {
    console.log("users list");
    res.send(users);
    return;
  }
  console.log("No friend sent a request to you");
  res.send({ message: "No friend sent a request to you" });
});

friendRequestRouter.post("/updaterequest", isAuth, async (req, res) => {
  console.log(req.body.status);
  console.log(req.body.userId);

  try {
    await friendRequest.update(
      { status: req.body.status },
      { where: { friend_user_id: req.user.id, user_id: req.body.userId } }
    );
    if (req.body.status == 2) {
      const friendData = {
        userid: req.body.userId,
        friendid: req.user.id,
      };
      const data = {
        friendid: req.body.userId,
        userid: req.user.id,
      };
      try {
        await Friend.create(friendData);
        await Friend.create(data);
        console.log("Accepted friend request  ");
        res
          .status(200)
          .send({ message: "Accepted friend request  " });
      } catch (err) {
        console.log(err);
      }
      return;
    }
    console.log("Rejected friend request  ");
    res.status(200).send({ message: "Rejected friend request  " });
    return;
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

friendRequestRouter.post("/removefriend", isAuth, async (req, res) => {
  console.log(req.body.friendId);
  console.log(req.body.status);
  console.log(req.user.id);
  try {
    await Friend.destroy({
      where: { userid: req.user.id, friendid: req.body.friendId },
    });
    await Friend.destroy({
      where: { userid: req.body.friendId, friendid: req.user.id },
    });
    try {
      await friendRequest.update(
        { status: req.body.status }, // 3
        { where: { friend_user_id: req.user.id, user_id: req.body.friendId } }
      );
      console.log("Removed a friend successfully ");
      res.status(200).send({ message: "Removed a friend successfully " });
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

friendRequestRouter.get("/viewfriends", isAuth, async (req, res) => {
  const friends = await Friend.findAll({
    where: {
      userid: req.user.id,
    },
  });
  console.log(friends);
  res.send(friends);
});

friendRequestRouter.get("/friendsoffriends", isAuth, async (req, res) => {
  const friends = await Friend.findAll({
    where: {
      userid: req.body.userId,
      [Op.not]: [{ friendid: req.user.id }],
    },
  });
  console.log(friends);
  res.send(friends);
});

friendRequestRouter.get("/viewmutualfriends", isAuth, async (req, res) => {
  const friends = await Friend.findAll({
    where: {
      userid: req.user.id,
    },
  });
  if(friends.length == 0){
    console.log('No mutual friends');
    res.send({message:'No mutual friends'});
    return;
  }
  // console.log(friends);
  // res.send(friends);
  var friendslist = [];
  for (var i = 0; i < friends.length; i++) {
    friendslist[i] = friends[i].dataValues.friendid;
  }
  console.log(`---------`);
  console.log(friendslist);
  console.log(`---------`);
  const mutualFriends = await Friend.findAll({
    where: {
      userid: req.body.mutualFriendUserId,
      friendid:{[Op.in]: friendslist},
      


    },
  });
  console.log(mutualFriends);
  res.send(mutualFriends);
  // console.log(friends);
  // res.send(friends);
});

module.exports = friendRequestRouter;
