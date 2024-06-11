package sk.tuke.gamestudio.entities;

import sk.tuke.gamestudio.game.core.Field;
import sk.tuke.gamestudio.game.core.Tile;
import sk.tuke.gamestudio.game.core.units.Unit;

import java.util.LinkedList;
import java.util.Queue;

public class GameSession {
    private Field field;
    private Queue<Tile> queue = new LinkedList<>();

    public GameSession() {
        this.field = new Field(); // Assuming 'Field' is already defined
    }

    public Field getField() {
        return field;
    }

    public Queue<Tile> getQueue() {
        return queue;
    }

    // Additional methods to manipulate game state can be added here
}
