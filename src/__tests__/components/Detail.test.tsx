import { cleanup, screen } from "@testing-library/react";
import { Detail } from "../../components/Detail/Detail";
import { afterEach, describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "../testUtils/test.utils.tsx";
import {
  detailPokemonData,
  parsedDetailPokemonData
} from "../testUtils/mocks.ts";
import userEvent from "@testing-library/user-event";
import { createRemixStub } from "@remix-run/testing";

const handleCloseMock = vi.fn();
const parsedPokemonDataMock = vi.fn();

vi.mock("../../components/Detail/Detail.hooks.ts", () => ({
  useDetail: () => ({
    handleClose: handleCloseMock,
    parsedPokemonData: parsedPokemonDataMock()
  })
}));

describe("Detail", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
  });
  it("Should hide the component after press on close button", async () => {
    const RemixStub = createRemixStub([
      {
        path: "/",
        Component: () => <Detail data={detailPokemonData} />
      }
    ]);

    parsedPokemonDataMock.mockReturnValue(parsedDetailPokemonData);
    renderWithProviders(<RemixStub initialEntries={["/"]} />);
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

    expect(screen.getByText(/not found/i)).toBeInTheDocument();
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
