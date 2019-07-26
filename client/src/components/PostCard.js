import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, Icon, Image, Label } from "semantic-ui-react";
import moment from "moment";

function PostCard({
    food: { body, createdAt, id, displayName, likeCount, commentCount, likes }
}) {
    function likeFood() {
        console.log("likeFood!");
    }
    function commentOnFood() {
        console.log("comment on food!");
    }
    return (
        <Card fluid style={{ borderRadius: 0 }}>
            <Card.Content>
                <Image
                    floated="right"
                    size="mini"
                    src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                />
                <Card.Header>{body}</Card.Header>
                <Card.Meta as={Link} to={`/foods/${id}`}>
                    <Icon name="user outline" style={{ marginRight: 5 }} />
                    {displayName}
                    <br />
                </Card.Meta>
                <Card.Meta as={Link} to={`/foods/${id}`}>
                    <Icon name="clock outline" style={{ marginRight: 5 }} />
                    {moment(createdAt).fromNow(true)}
                </Card.Meta>
                {/* <Card.Description>{body}</Card.Description> */}
            </Card.Content>
            <Card.Content extra>
                <Button as="div" labelPosition="right" onClick={likeFood}>
                    <Button color="red" basic>
                        <Icon name="heart" />
                    </Button>
                    <Label as="a" basic color="red" pointing="left">
                        {likeCount}
                    </Label>
                </Button>
                <Button as="div" labelPosition="right" onClick={commentOnFood}>
                    <Button color="green" basic>
                        <Icon name="comments" />
                    </Button>
                    <Label as="a" basic color="green" pointing="left">
                        {commentCount}
                    </Label>
                </Button>
            </Card.Content>
        </Card>
    );
}

export default PostCard;
