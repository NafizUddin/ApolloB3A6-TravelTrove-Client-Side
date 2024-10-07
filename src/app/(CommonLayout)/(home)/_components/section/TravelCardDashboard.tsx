import { Avatar } from "@nextui-org/avatar";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";

const TravelCardDashboard = ({ singlePost }: { singlePost: any }) => {
  const { title, image, postAuthor, createdAt } = singlePost;

  console.log(postAuthor);

  return (
    <div>
      <Card className="py-4">
        <CardHeader className="pb-0 pt-2 px-4 flex flex-col items-start">
          <div className="flex gap-2 items-start">
            <Avatar
              src={postAuthor?.profilePhoto}
              size="sm"
              className="object-cover"
            />
            <div>
              <p className="text-tiny uppercase font-bold">
                {postAuthor?.name}
              </p>
              <small className="text-default-500">
                {new Date(createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </small>
            </div>
          </div>
          <h4 className="font-bold text-large flex-grow">{title}</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2 w-full">
          <Image
            alt="Card background"
            className="object-cover rounded-xl w-full"
            src={image}
            width={320}
            height={165}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default TravelCardDashboard;
