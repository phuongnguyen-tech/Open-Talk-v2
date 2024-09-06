import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

// Styled component to limit text to 2 lines
const TruncatedTypography = styled(Typography)(({ theme }) => ({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  WebkitLineClamp: 2,
  lineClamp: 2,
  whiteSpace: "normal",
}));

export default function EventDescription({ description }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      {!isExpanded ? (
        <>
          <TruncatedTypography
            variant="body2"
            color="textSecondary"
            pr={2}
            mb={2}
          >
            {description}
          </TruncatedTypography>
          {/* {description.split(" ").length > 50 && (
            <Button
              variant="text"
              sx={{ display: "flex", justifyItems: "end" }}
              onClick={() => setIsExpanded(true)}
            >
              Show more
            </Button>
          )} */}
        </>
      ) : (
        <>
          <Typography variant="body2" color="textSecondary" pr={2} mb={2}>
            {description}
          </Typography>
          <Button
            variant="text"
            onClick={() => setIsExpanded(false)}
            style={{ textTransform: "none" }}
          >
            Show less
          </Button>
        </>
      )}
    </div>
  );
}
