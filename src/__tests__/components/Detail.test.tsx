import { cleanup, screen, waitFor } from "@testing-library/react";
import { Detail } from "@/components/Detail/Detail";
import { renderWithProviders } from "@/__tests__/testUtils/test.utils.tsx";
import {
  detailPokemonData,
  parsedDetailPokemonData
} from "@/__tests__/testUtils/mocks.ts";
import userEvent from "@testing-library/user-event";

const handleCloseMock = vi.fn();
const parsedPokemonDataMock = vi.fn();

vi.mock("@/components/Detail/Detail.hooks.ts", () => ({
  useDetail: () => ({
    handleClose: handleCloseMock,
    parsedPokemonData: parsedPokemonDataMock()
  })
}));

vi.mock("next/router", () => ({
  useRouter: () => ({
    query: {
      pokemon: "pikachu"
    }
  })
}));

describe("Detail", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
  });
  it("Should hide the component after press on close button", async () => {
    parsedPokemonDataMock.mockReturnValue(parsedDetailPokemonData);
    renderWithProviders(<Detail data={detailPokemonData} />);
    const user = userEvent.setup();

    const pokemonName = screen.getByText("pikachu");
    expect(pokemonName).toBeInTheDocument();

    const closeBtn = screen.getByRole("button", { name: "#close" });
    expect(closeBtn).toBeInTheDocument();

    await user.click(closeBtn);
    expect(handleCloseMock).toHaveBeenCalled();
  });

  it("Should display 'not found' if data isn't found", async () => {
    parsedPokemonDataMock.mockReturnValue(null);

    renderWithProviders(<Detail data={undefined} />);

    await waitFor(() => {
      expect(screen.getByText(/not found/i)).toBeInTheDocument();
    });
  });

  it("Should display correct pokemon information", async () => {
    parsedPokemonDataMock.mockReturnValue(parsedDetailPokemonData);
    renderWithProviders(<Detail data={detailPokemonData} />);

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
        new RegExp(`happiness: ${detailPokemonData.base_experience}`, "i")
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        new RegExp(`type: ${detailPokemonData.types[0].type.name}`, "i")
      )
    ).toBeInTheDocument();
  });
});
