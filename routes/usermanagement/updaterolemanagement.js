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
        "Ketua Komite Talent": 5
    };
    
    // Function to convert an array of role names to an array of corresponding integer IDs
    function convertRolesToIDs(roleNames) {
        return roleNames.map(roleName => roleMappings[roleName]);
    }
    
    const updatedRoles = req.body.updatedRoles; // Assuming updatedRoles is an array of role names
    const nippos = req.body.nippos;
    
    // Convert array of role names to array of corresponding integer IDs
    const updatedRoleIDs = convertRolesToIDs(updatedRoles);
    
    // Iterate over each updated role ID
    for (const role_id of updatedRoleIDs) {
        // Check if the combination of nippos and role_id exists in the table
        const existingRole = await prisma.role_Karyawan.findFirst({
            where: {
                nippos: nippos,
                role_id: role_id
            }
        });
    
        // If the combination doesn't exist, create a new entry
        if (!existingRole) {
            const updaterole = await prisma.role_Karyawan.createMany({
                data: {
                    nippos: nippos,
                    role_id: role_id
                }
            });
        } else {
            console.log(`Combination of nippos: ${nippos} and role_id: ${role_id} already exists.`);
        }
    }

    res.status(200).json({ masukProfile });
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: "Internal server error", err });
  }
});

export default router;