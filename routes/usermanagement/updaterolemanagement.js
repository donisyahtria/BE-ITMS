import prisma from "../../prisma/prisma";
import express from "express";

const router = express.Router();

router.post("/updaterolemanagement", async (req, res) => {
  try {
    const roleMappings = {
      "Super Admin": 1,
      "Admin Talent": 2,
      "Karyawan": 3,
      "Komite Unit": 4,
      "Ketua Komite Talent": 5,
      "Admin HCBP": 6
    };
    
    // Function to convert an array of role names to an array of corresponding integer IDs
    function convertRolesToIDs(roleNames) {
      return roleNames.map(roleName => roleMappings[roleName]);
    }
    
    const updatedRoles = req.body.updatedRoles; // Assuming updatedRoles is an array of role names
    const nippos = req.body.nippos;
    
    // Convert array of role names to array of corresponding integer IDs
    const updatedRoleIDs = convertRolesToIDs(updatedRoles);

    // Fetch existing roles from the database for the given nippos
    const existingRoles = await prisma.role_Karyawan.findMany({
      where: {
        nippos: nippos
      }
    });

    // Extract the role IDs from the existing roles
    const existingRoleIDs = existingRoles.map(role => role.role_id);

    // Determine which roles to add and which to delete
    const rolesToAdd = updatedRoleIDs.filter(roleID => !existingRoleIDs.includes(roleID));
    const rolesToDelete = existingRoleIDs.filter(roleID => !updatedRoleIDs.includes(roleID));

    // Add new roles
    for (const role_id of rolesToAdd) {
      if (role_id !== undefined) {
        await prisma.role_Karyawan.create({
          data: {
            nipposkaryawan: {
              connect: { nippos: nippos }
            },
            roleid: {
              connect: { id: role_id }
            }
          }
        });
      }
    }

    // Delete removed roles
    for (const role_id of rolesToDelete) {
      if (role_id !== undefined) {
        await prisma.role_Karyawan.deleteMany({
          where: {
            nippos: nippos,
            role_id: role_id
          }
        });
      }
    }

    res.status(200).json("done");
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;
