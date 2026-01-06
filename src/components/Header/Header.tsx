
import { Group, Badge, Paper, Button, Text, Flex } from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons-react";

interface HeaderProps {
  count: number;
  onCartClick: () => void;
}

export function Header({ count, onCartClick }: HeaderProps) {
  return (
    <Paper
      radius={0}
      px="lg"
      py={0}
      withBorder={false}
      style={{
        height: 59,
        position: "sticky",
        top: 0,
        zIndex: 10,
        backgroundColor: "#FFFFFF",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Group justify="space-between" style={{ width: "100%" }}>

        <Group
          align="center"
          style={{
            height: 44,
            borderRadius: 50,
            backgroundColor: "#f7f7f7",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "0px 16px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Text fw={600} fz="lg" c="#212529">
              Vegetable
            </Text>
          </div>

          <Badge
            radius="xl"
            size="lg"
            variant="filled"
            styles={{
              root: {
                backgroundColor: "#54B46A",
                height: 33,
                display: "flex",
                alignItems: "center",
                fontWeight: 700,
              },
              label: {
                fontSize: "16px",
                padding: "0 12px",
              },
            }}
          >
            SHOP
          </Badge>
        </Group>


        <Button
          aria-label="cart"
          onClick={onCartClick}
          radius="md"
          style={{
            backgroundColor: "#54B46A",
            height: 44,
            width: 144,
            padding: 0,
          }}
        >
          <Flex
            align="center"
            justify="center"
            gap={8}
            style={{ width: "100%", height: "100%" }}
          >
            {count > 0 && (
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  backgroundColor: "#fff",
                  color: "#000",
                  fontSize: 12,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {count}
              </div>
            )}
            <span style={{ color: "#fff", fontWeight: 600 }}>Cart</span>
            <IconShoppingCart color="#fff" size={20} />
          </Flex>
        </Button>
      </Group>
    </Paper>
  );
}
