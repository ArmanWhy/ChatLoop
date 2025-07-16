import { User } from "../models/User.js";

// Get Current Users

export const getProfile = async (req, res) => {
    res.json({ user: req.user })
}

//Update Current Users

export const updateUser = async (req, res) => {
    const { username, email } = req.body

    try {
        const user = await User.findById(req.user._id)
        if(username) user.username = username
        if(email) user.email = email

        await user.save()
        res.json({ message: "User updated successfully", user })
    } catch (error) {
        res.status(500).json({ message: 'User update failed...', error: error.message })
    }
}

// Delete Current Users

// export const deleteUser = async (req, res) => {
//     const userId = req.params.id

//     try {
//         const user = await User.findByIdAndDelete(userId)
//         if(!user) return res.status(404).json({ message: "User not found" })
//         res.json({ message: "User deleted successfully", user })
//     } catch (error) {
//         res.status(500).json({ message: 'User deletion failed...', error: error.message })
//     }
// }

// List all users (optional: for admin or search)
export const listUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};