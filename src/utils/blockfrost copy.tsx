import { BlockfrostPluts } from "@harmoniclabs/blockfrost-pluts";

export async function blockfrostPreProd() {
    return new BlockfrostPluts({
        projectId: "preprodx670GWOQ6OC85fETu6xd0Gbu7nZuZI6W",
    });
}
