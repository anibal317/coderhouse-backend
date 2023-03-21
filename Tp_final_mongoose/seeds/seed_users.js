/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      name: "Lorenzo Quesada",
      userName: "elmasmejor@mail.com",
      pwd:"scy8bb1lrisV3CO3BTLOLM",
      isAdmin:false,
      thumbnail: "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png"
    },
    {
      name: "Super Admin",
      userName: "admin@admin.com",
      pwd:"admin",
      isAdmin:true,
      thumbnail: "https://img.favpng.com/20/19/9/user-system-administrator-computer-icons-scalable-vector-graphics-clip-art-png-favpng-DNh10FWZMki2kCny8cqTugNM2.jpg"
    },
    {
      name: "Jorge Sardon",
      userName: "jsardon@mail.com",
      pwd:"k4syl74vih1YJADN9DRPG",
      isAdmin:true,
      thumbnail: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
    }
  ]);

};
