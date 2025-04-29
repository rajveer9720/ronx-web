import { useState } from "react";
import {
  stages,
  slotPrices,
  calculateCost,
  calculateResult,
} from "../../utils/calculatorUtils";
import {
  Box,
  Paper,
  Typography,
  Button,
  Card,
  Grid,
  ButtonGroup,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Calculator = () => {
  const theme = useTheme();
  const [selectedStage, setSelectedStage] = useState(stages[0]);
  const [selectedSlots, setSelectedSlots] = useState<number[]>([]);
  const cost = calculateCost(selectedSlots, selectedStage, slotPrices);
  const result = calculateResult(selectedSlots, selectedStage, slotPrices);

  const handleStageSelect = (stage: (typeof stages)[0]) => {
    setSelectedStage(stage);
    setSelectedSlots([]);
  };

  const handleSlotSelect = (slot: number) => {
    setSelectedSlots((prev) => {
      if (slot === 12) {
        return prev.includes(12)
          ? []
          : Array.from({ length: 12 }, (_, i) => i + 1);
      }
      if (prev.includes(slot)) {
        return prev.filter((s) => s < slot);
      }
      if (selectedStage.name === "Stage 1" && slot < 1) {
        return prev; // Prevent deselecting below stage 1
      }
      return Array.from({ length: slot }, (_, i) => i + 1);
    });
  };

  const cardStyle = {
    p: 5,
    borderRadius: "20px",
    border: "1px solid #e0e0e0",
    boxShadow: "none",
    transition: "all 0.3s ease",
    my: 2,
  };

  return (
    <Grid container>
      <Grid size={{ xs: 12, sm: 12, md: 4 }} offset={{ xs: 0, sm: 0, md: 4 }}>
        <Box>
          <ButtonGroup variant="outlined" size="large" fullWidth>
            {stages.map((stage) => (
              <Button
                key={stage.name}
                variant={
                  selectedStage.name === stage.name ? "contained" : "outlined"
                }
                onClick={() => handleStageSelect(stage)}
              >
                {stage.name}
              </Button>
            ))}
          </ButtonGroup>
        </Box>

        <Card sx={cardStyle}>
          <Box>
            <Typography>Cost of current selected slot(s):</Typography>
            <Typography variant="h6" fontWeight={700}>
              {cost} BUSD
            </Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box>
            <Typography>Total Cost after 1 cycle completes:</Typography>
            <Typography variant="h6" fontWeight={700}>
              {result} BUSD
            </Typography>
          </Box>
        </Card>

        <Card sx={cardStyle}>
          <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={2}>
              {[...Array(12)].map((_, index) => (
                <Paper
                  key={index}
                  sx={{
                    p: 1.5,
                    textAlign: "center",
                    cursor: "pointer",
                    backgroundColor: selectedSlots.includes(index + 1)
                      ? theme.palette.primary.main // Selected slot color (blue)
                      : theme.palette.grey[500], // Unselected slot color (light grey)
                    boxShadow: 3,
                    color: "white",
                    borderRadius: "100%",
                    height: "50px",
                    width: "50px",
                  }}
                  onClick={() => handleSlotSelect(index + 1)}
                >
                  {index + 1}
                </Paper>
              ))}
            </Box>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Calculator;
