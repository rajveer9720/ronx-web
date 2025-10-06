import React from "react";
import { Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ModalVideo from "./ModalVideo";
import VideoThumb from "../../../../public/assets/images/hero-image-01.jpg";
import { Colors } from "../../../utils/colors";
import { APP_NAME } from "../../../utils/constants";

const HeroHome: React.FC = () => {
  // const [tabIndex, setTabIndex] = useState(0);

  // const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
  //   setTabIndex(newValue);
  // };

  // Common button style
  const buttonStyle = {
    backgroundColor: Colors.button_bg,
    color: Colors.button_text,
    textTransform: "none",
    fontWeight: 500,
    px: 3,
    py: "8px",
    borderRadius: "0.5rem",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    "&:hover": {
      backgroundColor: Colors.hover,
      transform: "scale(1.02)",
    },
    transition: "all 0.2s",
  };

  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="text-center pb-12 md:pb-20">
            <h1
              className="bg-clip-text  text-4xl font-semibold animate-[gradient_6s_linear_infinite] md:text-5xl" style={{ color: Colors.heading }}
              data-aos="fade-up"
            >
              Welcome to {APP_NAME} BUSD
            </h1>
            <div className="mx-auto max-w-3xl">
              <p
                className="mb-8 text-xl"
                data-aos="fade-up"
                data-aos-delay={200} style={{ color: Colors.paragraph }}
              >
                Connect your wallet to start working. First time here? Watch a
                tutorial to learn more
              </p>
              <div className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center gap-4">
                <div data-aos="fade-up" data-aos-delay={400}>
                  <Button
                    variant="contained"
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      ...buttonStyle,
                      mb: { xs: 2, sm: 0 },
                    }}
                    href="/dashboard"
                  >
                    Get Started
                  </Button>
                </div>
                <div data-aos="fade-up" data-aos-delay={600}>
                  <Button
                    variant="contained"
                    sx={{
                      ...buttonStyle,
                      ml: { sm: 2 },
                    }}
                  >
                    Watch tutorial
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <ModalVideo
            thumb={VideoThumb}
            thumbWidth={1104}
            thumbHeight={576}
            thumbAlt="Modal video thumbnail"
            video="videos//video.mp4"
            videoWidth={1920}
            videoHeight={1080}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroHome;
