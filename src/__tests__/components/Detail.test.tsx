import { cleanup, screen, waitFor } from "@testing-library/react";
import { Detail } from "@/components/Detail/Detail";
import { renderWithProviders } from "@/__tests__/testUtils/test.utils.tsx";
import { detailPokemonData } from "@/__tests__/testUtils/mocks.ts";
import userEvent from "@testing-library/user-event";

const handleCloseMock = vi.fn();

vi.mock(
  "@/components/Detail/CloseDetailButton/CloseDetailButton.hooks.ts",
  () => ({
    useCloseDetailButton: () => ({
      handleClose: handleCloseMock
    })
  })
);

describe("Detail", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
  });
  it("Should hide the component after press on close button", async () => {
    renderWithProviders(
      await (async () => {
        return await Detail({ name: "pikachu" });
      })()
    );
    const user = userEvent.setup();

    const pokemonName = screen.getByText("pikachu");
    expect(pokemonName).toBeInTheDocument();

    const closeBtn = screen.getByRole("button", { name: "#close" });
    expect(closeBtn).toBeInTheDocument();

    await user.click(closeBtn);
    expect(handleCloseMock).toHaveBeenCalled();
  });

  it("Should display 'not found' if data isn't found", async () => {
    renderWithProviders(
      await (async () => {
        return await Detail({ name: "null" });
      })()
    );

    await waitFor(() => {
      expect(screen.getByText(/not found/i)).toBeInTheDocument();
    });
  });

  it("Should display correct pokemon information", async () => {
    renderWithProviders(
      await (async () => {
        return await Detail({ name: "pikachu" });
      })()
    );

    expect(
      screen.getByText(new RegExp(detailPokemonData.name, "i"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(`height: ${detailPokemonData.height}`, "i"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(`weight: ${detailPokemonData.weight}`, "i"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        new RegExp(`experience: ${detailPokemonData.base_experience}`, "i")
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        new RegExp(`type: ${detailPokemonData.types[0].type.name}`, "i")
      )
    ).toBeInTheDocument();
  });
});
