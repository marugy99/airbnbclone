import { sanityClient } from "../../sanity";

sanityClient.config({
    token: process.env.NEXT_PUBLIC_SANITY_WRITE_TOKEN,
});

export default async function likeButtonHandler(req, res) {
    const fullBody = req.body;
    const id = fullBody._id;
    const data = await sanityClient
        .patch(id)
        .setIfMissing({ likes: 0 })
        .inc({ likes: 1 })
        .commit()
        .catch((error) => console.log(error));

    res.status(200).json({ 
        likes: data.likes
    })
}